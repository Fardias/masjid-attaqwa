import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Pastikan path ini benar
import { Badge } from './ui/badge'; // Pastikan path ini benar
import { Button } from './ui/button'; // Pastikan path ini benar
import { Calendar, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getUpcomingEvents } from '../../lib/services/eventService'; // Pastikan path ini benar

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
      timeZone: 'Asia/Jakarta',
    }).format(date);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const tolerance = 5;
      setShowLeftArrow(scrollLeft > tolerance);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - tolerance);
    }
  };

  const toggleFullScreen = (eventId) => {
    const element = document.getElementById(`event-${eventId}`);
    if (!element) return;

    if (!document.fullscreenElement) {
      const requestFullscreen = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
      if (requestFullscreen) {
        requestFullscreen.call(element)
          .then(() => setFullscreenId(eventId))
          .catch(() => setFullscreenId(null));
      }
    } else {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if (exitFullscreen) {
        exitFullscreen.call(document).catch(console.error);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setFullscreenId(null);
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
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
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
        {isLoading && <p className="p-4 text-center text-gray-500">Memuat acara...</p>}
        {error && <p className="p-4 text-center text-red-500">Gagal memuat acara. Silakan coba lagi nanti.</p>}
        {events?.length > 0 ? (
          <div className="relative">
            {showLeftArrow && events.length > 1 && (
              <button onClick={scrollLeft} className="absolute left-0 z-10 hidden p-2 transition-colors -translate-y-1/2 bg-white border rounded-full shadow-lg md:flex top-1/2 hover:bg-gray-50" style={{ marginLeft: '-20px' }} aria-label="Scroll left">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {showRightArrow && events.length > 1 && (
              <button onClick={scrollRight} className="absolute right-0 z-10 hidden p-2 transition-colors -translate-y-1/2 bg-white border rounded-full shadow-lg md:flex top-1/2 hover:bg-gray-50" style={{ marginRight: '-20px' }} aria-label="Scroll right">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div ref={scrollContainerRef} className="grid grid-cols-1 gap-6 pb-4 md:flex md:overflow-x-auto md:space-x-6 md:gap-0 scrollbar-hide">
              {events.map((event) => {
                const isFullscreen = fullscreenId === event.id;
                return (
                  <div
                    key={event.id}
                    id={`event-${event.id}`}
                    className={`transition-all duration-200
                      ${isFullscreen
                        ? 'bg-black text-white fixed inset-0 z-50 flex flex-row p-0 overflow-hidden' // p-0 for parent fullscreen
                        : 'bg-white border rounded-lg shadow-sm hover:shadow-md w-full md:w-80 md:flex-shrink-0 h-full relative flex flex-col'
                      }`}
                  >
                    {/* Image Container (Left Pane in Fullscreen) */}
                    <div
                      className={`
                        ${isFullscreen
                          ? 'w-5/12 h-full flex-shrink-0 p-2 sm:p-3 md:p-4' // Padding for image pane
                          : 'w-full h-64 flex-shrink-0'
                        }`}
                    >
                      {event.images_url ? (
                        <img
                          src={event.images_url}
                          alt={event.judul}
                          className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover rounded-t-lg'}`}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isFullscreen ? 'bg-gray-900' : 'bg-gray-100 rounded-t-lg'}`}>
                          <Calendar className={`w-12 h-12 ${isFullscreen ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                      )}
                    </div>

                    {/* Content Container (Right Pane in Fullscreen) */}
                    <div
                      className={`flex
                        ${isFullscreen
                          // MODIFIED: Right pane is flex-col to stack text area and button area. No horizontal padding here.
                          ? 'w-7/12 h-full flex-col'
                          : 'flex-col flex-grow p-4 space-y-3' // Normal view
                        }`}
                    >
                      {/* Area for Centered & Scrollable Text Content */}
                      <div
                        className={`
                          ${isFullscreen
                            // MODIFIED: This div centers the inner text wrapper. It takes available vertical space.
                            // Padding is applied here for the text area.
                            ? 'flex-grow flex justify-center items-center overflow-hidden px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4'
                            // For normal view, this outer div acts as the main content wrapper itself
                            : 'flex flex-col flex-grow space-y-3'
                          }`}
                      >
                        {/* Inner Scrollable Text Wrapper (or normal content wrapper) */}
                        <div
                          className={`
                            ${isFullscreen
                              ? 'w-full max-h-full overflow-y-auto flex flex-col space-y-2 sm:space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'
                              // For normal view, its parent handles flex-col, flex-grow and space-y
                              : 'contents' // Use 'contents' to make this div not affect layout for normal view, its children become direct children of parent
                            }`}
                        >
                          {/* Top Text Block (Title, Badge) */}
                          <div className={isFullscreen ? 'flex-shrink-0' : ''}>
                            <h3
                              className={`font-semibold transition-all ${isFullscreen
                                ? 'text-xl sm:text-2xl md:text-[2rem] leading-tight text-gray-100 line-clamp-3 sm:line-clamp-4'
                                : 'text-lg text-gray-900 line-clamp-2'
                                }`}
                            >
                              {event.judul}
                            </h3>
                            <div className={`flex items-center ${isFullscreen ? 'mt-1 sm:mt-1.5 md:mt-2' : 'mt-0'}`}>
                              <Badge
                                variant="outline"
                                className={`text-xs ${isFullscreen
                                  ? 'bg-amber-600 text-amber-50 hover:bg-amber-500 sm:text-sm px-2 py-0.5'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  }`}
                              >
                                {event.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Middle Text Block (Details) */}
                          <div
                            className={`
                              ${isFullscreen
                                ? 'space-y-1 sm:space-y-1.5'
                                : `space-y-2 ${!isFullscreen ? 'flex-grow' : ''}` // flex-grow only in normal view
                              }`}
                          >
                            {[
                              { label: 'Tanggal', value: formatDate(event.tanggal_mulai) },
                              { label: 'Waktu', value: formatTime(event.waktu) },
                              { label: 'Lokasi', value: event.lokasi ?? 'Masjid At-Taqwa' },
                              event.speaker && { label: 'Pemateri', value: event.speaker },
                            ]
                              .filter(Boolean)
                              .map((item) => (
                                <div
                                  key={item.label}
                                  className={`transition-all ${isFullscreen
                                    ? 'text-base sm:text-lg md:text-[1.1rem] leading-snug'
                                    : 'text-sm text-gray-600 flex flex-col'
                                    }`}
                                >
                                  <p className={isFullscreen ? 'flex items-baseline' : ''}>
                                    <span className={`font-semibold ${isFullscreen ? 'text-gray-400 w-[70px] sm:w-[85px] md:w-[95px] flex-shrink-0' : 'text-gray-900'}`}>
                                      {item.label} :
                                    </span>
                                    <span className={isFullscreen ? 'text-gray-200 ml-1.5 sm:ml-2' : 'block'}>
                                      {item.value}
                                    </span>
                                  </p>
                                </div>
                              ))}
                          </div>

                          {/* Maximize Button for Normal View */}
                          {!isFullscreen && (
                            <div className="pt-1 mt-auto"> {/* mt-auto pushes it to bottom in normal view */}
                              <Button
                                onClick={() => toggleFullScreen(event.id)}
                                variant="outline"
                                size="sm"
                                className="flex items-center justify-center w-full gap-2 transition-colors bg-white hover:bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300"
                              >
                                <Maximize2 className="w-4 h-4" /> Fullscreen
                              </Button>
                            </div>
                          )}
                        </div> {/* End of Inner Scrollable Text Wrapper / Normal Content Wrapper */}
                      </div> {/* End of Area for Centered & Scrollable Text Content / Normal Main Content Area */}

                      {/* Bottom Button Area (Only in Fullscreen) */}
                      {isFullscreen && (
                        <div className="flex-shrink-0 px-2 pt-1 pb-2 sm:px-3 md:px-4 sm:pb-3 md:pb-4 sm:pt-2"> {/* Padding for button area */}
                          <Button
                            onClick={() => toggleFullScreen(event.id)}
                            variant="outline"
                            size={'sm'}
                            className={'w-full flex items-center justify-center gap-2 transition-colors bg-gray-700 hover:bg-gray-600 text-white border-gray-500 text-xs sm:text-sm py-2 sm:py-2.5'}
                          >
                            <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Keluar
                          </Button>
                        </div>
                      )}
                    </div> {/* End of Content Container (Right Pane) */}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="py-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Tidak ada acara mendatang</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}