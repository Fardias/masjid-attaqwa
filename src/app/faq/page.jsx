import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function FAQPage() {
  // Sample FAQ data
  const faqs = [
    {
      category: "Umum",
      questions: [
        {
          id: "q1",
          question: "Apa saja fasilitas yang tersedia di Masjid At-Taqwa?",
          answer:
            "Masjid At-Taqwa memiliki berbagai fasilitas seperti ruang sholat utama",
        },
        {
          id: "q2",
          question: "Bagaimana cara menjadi anggota jamaah tetap Masjid At-Taqwa?",
          answer:
            "Untuk menjadi anggota jamaah tetap, Anda dapat mendaftar di sekretariat masjid dengan membawa fotokopi KTP dan mengisi formulir pendaftaran. Tidak ada biaya untuk menjadi anggota jamaah tetap.",
        },
        {
          id: "q3",
          question: "Apakah Masjid At-Taqwa memiliki program pendidikan?",
          answer:
            "Ya, Masjid At-Taqwa memiliki beberapa program pendidikan seperti Taman Pendidikan Al-Quran (TPQ) untuk anak-anak, kajian rutin untuk remaja dan dewasa, serta kursus bahasa Arab dan tahsin Al-Quran.",
        },
      ],
    },
    {
      category: "Kegiatan",
      questions: [
        {
          id: "q4",
          question: "Kapan jadwal kajian rutin di Masjid At-Taqwa?",
          answer:
            "Kajian rutin di Masjid At-Taqwa diadakan setiap: \n- Senin malam (Ba'da Maghrib): Kajian Fiqih \n- Rabu malam (Ba'da Maghrib): Kajian Tafsir Al-Quran \n- Sabtu pagi (08.00-10.00): Kajian Hadits \n- Ahad pagi (08.00-10.00): Kajian Umum",
        },
        {
          id: "q5",
          question: "Bagaimana cara mendaftar untuk kegiatan-kegiatan di Masjid At-Taqwa?",
          answer:
            "Untuk mendaftar kegiatan di Masjid At-Taqwa, Anda dapat menghubungi sekretariat masjid secara langsung, atau melalui nomor telepon/WhatsApp yang tertera di website. Beberapa kegiatan juga menyediakan pendaftaran online melalui website resmi masjid.",
        },
        {
          id: "q6",
          question: "Apakah Masjid At-Taqwa menerima permintaan untuk acara pernikahan?",
          answer:
            "Ya, Masjid At-Taqwa menyediakan fasilitas untuk akad nikah. Untuk reservasi, silakan menghubungi sekretariat masjid minimal 1 bulan sebelum tanggal acara. Ada beberapa persyaratan administratif yang perlu dipenuhi dan kontribusi untuk pemeliharaan masjid.",
        },
      ],
    },
    {
      category: "Donasi",
      questions: [
        {
          id: "q7",
          question: "Bagaimana cara berdonasi untuk Masjid At-Taqwa?",
          answer:
            "Anda dapat berdonasi melalui beberapa cara: \n1. Langsung ke kotak amal yang tersedia di masjid  \n2. Melalui QR code yang tersedia di masjid",
        },
        // {
        //   id: "q8",
        //   question: "Apakah donasi ke Masjid At-Taqwa mendapatkan laporan penggunaan dana?",
        //   answer:
        //     "Ya, Masjid At-Taqwa secara rutin mempublikasikan laporan keuangan termasuk pemasukan dari donasi dan penggunaannya. Laporan ini ditempel di papan pengumuman masjid dan juga dapat diakses melalui website resmi masjid.",
        // },
        // {
        //   id: "q9",
        //   question: "Apakah Masjid At-Taqwa menerima donasi dalam bentuk barang?",
        //   answer:
        //     "Ya, Masjid At-Taqwa menerima donasi dalam bentuk barang seperti perlengkapan ibadah, buku-buku Islam, dan kebutuhan masjid lainnya. Untuk donasi barang, silakan menghubungi pengurus masjid terlebih dahulu untuk konfirmasi kebutuhan.",
        // },
      ],
    },
  ]

  return (
    <div className="container px-4 py-12 mx-auto ">
      <h1 className="mb-8 text-4xl font-bold text-center">Pertanyaan yang Sering Diajukan</h1>
      <div className="grid gap-5 xl:px-[200px]">
        {faqs.map((category) => (
          <Card key={category.category}>
            <CardHeader className="xl:text-3xl text-amber-600">
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="font-medium text-left cursor-pointer xl:text-xl">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-700 whitespace-pre-line xl:text-lg">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
