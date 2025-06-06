// Hover events
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

export default function ProfilePage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Profil Masjid At-Taqwa</h1>

      <Tabs defaultValue="visi-misi" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="visi-misi" className="cursor-pointer">Visi dan Misi</TabsTrigger>
          <TabsTrigger value="sejarah" className="cursor-pointer">Sejarah</TabsTrigger>
          <TabsTrigger value="pengurus" className="cursor-pointer">Pengurus</TabsTrigger>
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
                  <h3 className="mb-4 text-2xl font-bold">Visi</h3>
                  <p className="text-gray-700">
                    Menjadikan Masjid At-Taqwa sebagai pusat ibadah, pendidikan, dan pemberdayaan umat yang berkualitas,
                    serta menjadi masjid yang makmur, mandiri, dan bermanfaat bagi masyarakat sekitar.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-bold">Misi</h3>
                  <ul className="pl-6 space-y-2 text-gray-700 list-disc">
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
                  ....
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
                  <h3 className="mb-3 text-xl font-bold">Dewan Pembina</h3>
                  <ul className="pl-6 text-gray-700 list-disc">
                    <li>...</li>
                    <li>...</li>
                    <li>...</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold">Pengurus Harian</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="font-semibold">Ketua:</span> ...
                    </li>
                    <li>
                      <span className="font-semibold">Wakil Ketua:</span> ...
                    </li>
                    <li>
                      <span className="font-semibold">Sekretaris:</span> ...
                    </li>
                    <li>
                      <span className="font-semibold">Bendahara:</span> ...
                    </li>
                  </ul>
                </div>

                {/* <div>
                  <h3 className="mb-3 text-xl font-bold">Bidang-bidang</h3>
                  <div className="grid grid-cols-1 gap-4 text-gray-700 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold">Bidang Ibadah & Dakwah</h4>
                      <ul className="pl-6 list-disc">
                        <li>Ust. Ahmad Syafii</li>
                        <li>Ust. Zainuddin</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Pendidikan</h4>
                      <ul className="pl-6 list-disc">
                        <li>Drs. Mahmud Hasan</li>
                        <li>Hj. Siti Aminah, M.Pd</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Sosial & Humas</h4>
                      <ul className="pl-6 list-disc">
                        <li>H. Sulaiman</li>
                        <li>Ibu Fatimah</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bidang Pembangunan</h4>
                      <ul className="pl-6 list-disc">
                        <li>Ir. Hadi Purnomo</li>
                        <li>H. Joko Widodo</li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
