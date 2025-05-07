import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Profil Masjid At-Taqwa</h1>

      <Tabs defaultValue="visi-misi" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="visi-misi">Visi dan Misi</TabsTrigger>
          <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
          <TabsTrigger value="pengurus">Pengurus</TabsTrigger>
        </TabsList>

        <TabsContent value="visi-misi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visi dan Misi</CardTitle>
              <CardDescription>Tujuan dan arah Masjid At-Taqwa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Visi</h3>
                  <p className="text-gray-700">
                    Menjadikan Masjid At-Taqwa sebagai pusat ibadah, pendidikan, dan pemberdayaan umat yang berkualitas,
                    serta menjadi masjid yang makmur, mandiri, dan bermanfaat bagi masyarakat sekitar.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Misi</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Menyelenggarakan kegiatan ibadah yang khusyuk dan istiqomah</li>
                    <li>Mengembangkan pendidikan Islam yang komprehensif untuk semua kalangan</li>
                    <li>Membangun kegiatan sosial kemasyarakatan yang bermanfaat</li>
                    <li>Mengelola masjid secara profesional, transparan, dan akuntabel</li>
                    <li>Membangun infrastruktur masjid yang nyaman dan representatif</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sejarah" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sejarah Masjid At-Taqwa</CardTitle>
              <CardDescription>Perjalanan berdirinya Masjid At-Taqwa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  Masjid At-Taqwa didirikan pada tahun 1985 oleh sekelompok tokoh masyarakat yang peduli dengan
                  perkembangan dakwah Islam di daerah ini. Awalnya, masjid ini hanyalah bangunan sederhana dengan
                  kapasitas jamaah yang terbatas.
                </p>
                <p>
                  Seiring berjalannya waktu, dengan dukungan masyarakat sekitar, Masjid At-Taqwa terus berkembang dan
                  mengalami beberapa kali renovasi. Renovasi besar pertama dilakukan pada tahun 1995, yang memperluas
                  area masjid dan menambah fasilitas pendukung.
                </p>
                <p>
                  Pada tahun 2010, dilakukan renovasi total yang mengubah wajah Masjid At-Taqwa menjadi seperti yang
                  kita lihat sekarang. Dengan arsitektur yang megah dan fasilitas yang lengkap, Masjid At-Taqwa kini
                  menjadi salah satu masjid kebanggaan masyarakat.
                </p>
                <p>
                  Hingga saat ini, Masjid At-Taqwa terus berperan aktif dalam pembinaan umat dan pengembangan masyarakat
                  melalui berbagai program keagamaan, pendidikan, dan sosial.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pengurus" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Struktur Pengurus</CardTitle>
              <CardDescription>Periode 2023-2028</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Dewan Pembina</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>H. Ahmad Fauzi</li>
                    <li>H. Muhammad Ridwan</li>
                    <li>H. Abdul Karim</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Pengurus Harian</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="font-semibold">Ketua:</span> H. Budi Santoso
                    </li>
                    <li>
                      <span className="font-semibold">Wakil Ketua:</span> Ir. Hasan Basri
                    </li>
                    <li>
                      <span className="font-semibold">Sekretaris:</span> Muhammad Iqbal, S.Pd
                    </li>
                    <li>
                      <span className="font-semibold">Bendahara:</span> H. Rahmat Hidayat
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Bidang-bidang</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <h4 className="font-semibold">Bidang Ibadah & Dakwah</h4>
                      <ul className="list-disc pl-6">
                        <li>Ust. Ahmad Syafii</li>
                        <li>Ust. Zainuddin</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Pendidikan</h4>
                      <ul className="list-disc pl-6">
                        <li>Drs. Mahmud Hasan</li>
                        <li>Hj. Siti Aminah, M.Pd</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Sosial & Humas</h4>
                      <ul className="list-disc pl-6">
                        <li>H. Sulaiman</li>
                        <li>Ibu Fatimah</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Pembangunan</h4>
                      <ul className="list-disc pl-6">
                        <li>Ir. Hadi Purnomo</li>
                        <li>H. Joko Widodo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
