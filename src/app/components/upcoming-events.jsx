import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getUpcomingEvents } from '../../lib/services/eventService';

const fetchEvents = () => getUpcomingEvents();

export default function UpcomingEvents() {
  const { data: events, error, isLoading } = useSWR('upcoming-events', fetchEvents);
  const [fullscreenId, setFullscreenId] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const toggleFullScreen = (eventId) => {
    const element = document.getElementById(`event-${eventId}`);
    if (!element) {
      console.error('Element not found:', `event-${eventId}`);
      return;
    }

    if (!document.fullscreenElement) {
      const requestFullscreen = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
      if (requestFullscreen) {
        requestFullscreen.call(element).then(() => {
          setFullscreenId(eventId);
        }).catch((err) => {
          console.error('Gagal masuk fullscreen:', err);
        });
      }
    } else {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if (exitFullscreen) {
        exitFullscreen.call(document).then(() => {
          setFullscreenId(null);
        }).catch((err) => {
          console.error('Gagal keluar fullscreen:', err);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenId(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [events]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-amber-600" />
          Acara Mendatang
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <p className="text-gray-500">Memuat acara...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-4">
            <p className="text-red-500">Gagal memuat acara. Silakan coba lagi nanti.</p>
          </div>
        )}

        {events?.length > 0 ? (
          <div className="relative">
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors border"
                style={{ marginLeft: '-20px' }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors border"
                style={{ marginRight: '-20px' }}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="grid grid-cols-1 md:flex md:overflow-x-auto md:space-x-6 gap-6 md:gap-0 pb-4"
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  id={`event-${event.id}`}
                  className="flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full md:w-80 md:flex-shrink-0 h-full"
                >
                  <div className="w-full h-64 flex-shrink-0">
                    {event.images_url ? (
                      <img
                        src={event.images_url}
                        alt={event.judul}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-t-lg flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow p-4 space-y-3">
                    <h3
                      className={`font-semibold line-clamp-2 transition-all ${
                        fullscreenId === event.id ? 'text-[150px] leading-tight' : 'text-lg text-gray-900'
                      }`}
                    >
                      {event.judul}
                    </h3>

                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs">
                        {event.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div
                        className={`flex flex-col transition-all ${
                          fullscreenId === event.id ? 'text-[40px]' : 'text-sm text-gray-600'
                        }`}
                      >
                        <p>
                          <span className="font-medium text-gray-900">Tanggal:</span>
                          <br />
                          {formatDate(event.tanggal_mulai)}
                        </p>
                      </div>

                      <div
                        className={`flex flex-col transition-all ${
                          fullscreenId === event.id ? 'text-[40px]' : 'text-sm text-gray-600'
                        }`}
                      >
                        <p>
                          <span className="font-medium text-gray-900">Waktu:</span>
                          <br />
                          {formatTime(event.waktu)}
                        </p>
                      </div>

                      <div
                        className={`flex flex-col transition-all ${
                          fullscreenId === event.id ? 'text-[40px]' : 'text-sm text-gray-600'
                        }`}
                      >
                        <p>
                          <span className="font-medium text-gray-900">Lokasi:</span>
                          <br />
                          {event.lokasi ?? 'Masjid At-Taqwa'}
                        </p>
                      </div>

                      {event.speaker && (
                        <div
                          className={`flex flex-col transition-all ${
                            fullscreenId === event.id ? 'text-[40px]' : 'text-sm text-gray-600'
                          }`}
                        >
                          <p>
                            <span className="font-medium text-gray-900">Pemateri:</span>
                            <br />
                            {event.speaker}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-auto">
                      <Button
                        onClick={() => toggleFullScreen(event.id)}
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300 transition-colors"
                      >
                        {fullscreenId === event.id ? (
                          <>
                            <Minimize2 className="w-4 h-4" />
                            Keluar Fullscreen
                          </>
                        ) : (
                          <>
                            <Maximize2 className="w-4 h-4" />
                            Fullscreen
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada acara mendatang</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}