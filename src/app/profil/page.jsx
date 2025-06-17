"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

const pengurus = {
  dkm: {
    ketua: "H. Ruslan",
    wakilKetua: "Surila",
    sekretaris: "Mujianto",
    wakilSekretaris: "Gunawan Muhammad",
    bidang: {
      "Da'wah/Pendidikan": ["Dwiyono", "Ibnu Maarif", "Arif Rohman"],
      PHBI: ["Rully Fatahillah", "Ijat Sudrajat", "Agus Salim", "Goenawan"],
      "Sosial/Kemasyarakatan": ["H. Ili", "Purwito", "Sartono"],
      ZIS: ["Joko Prayitno", "Dadang"],
      "Perlengkapan/Pemeliharaan": ["Bagio Trisno N", "Tjatja Suwarsa"],
    },
  },
  pembangunan: {
    ketua: "Edi Nasirun, S.Pd, M.PdI",
    sekretaris: "Dadang Kurniawan",
    bendahara: "Fitri Asni",
    wakilBendahara: "Setyo Hariawan",
    perencanaan: "Erlangga Prayitno",
  },
}

export default function ProfilePage() {
  return (
    <main className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">
        Profil Masjid At-Taqwa
      </h1>

      <Tabs defaultValue="visi-misi" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visi-misi">Visi dan Misi</TabsTrigger>
          <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
          <TabsTrigger value="pengurus">Pengurus</TabsTrigger>
        </TabsList>

        {/* === VISI MISI === */}
        <TabsContent value="visi-misi" className="mt-6">
          <section aria-labelledby="visi-title">
            <Card>
              <CardHeader>
                <CardTitle id="visi-title">Visi dan Misi</CardTitle>
                <CardDescription>
                  Tujuan dan arah Masjid At-Taqwa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">Visi</h2>
                    <p className="text-gray-700">
                      Menjadikan Masjid At-Taqwa sebagai pusat ibadah,
                      pendidikan, dan pemberdayaan umat yang berkualitas,
                      serta menjadi masjid yang makmur, mandiri, dan bermanfaat bagi masyarakat sekitar.
                    </p>
                  </section>
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">Misi</h2>
                    <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                      <li>Menyelenggarakan kegiatan ibadah yang khusyuk dan istiqomah</li>
                      <li>Mengembangkan pendidikan Islam yang komprehensif untuk semua kalangan</li>
                      <li>Membangun kegiatan sosial kemasyarakatan yang bermanfaat</li>
                      <li>Mengelola masjid secara profesional, transparan, dan akuntabel</li>
                      <li>Membangun infrastruktur masjid yang nyaman dan representatif</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* === SEJARAH === */}
        <TabsContent value="sejarah" className="mt-6">
          <section aria-labelledby="sejarah-title">
            <Card>
              <CardHeader>
                <CardTitle id="sejarah-title">Sejarah Masjid At-Taqwa</CardTitle>
                <CardDescription>Perjalanan berdirinya Masjid At-Taqwa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Masukkan narasi sejarah di sini...
                </p>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* === PENGURUS === */}
        <TabsContent value="pengurus" className="mt-6">
          <section aria-labelledby="pengurus-title">
            <Card>
              <CardHeader>
                <CardTitle id="pengurus-title">Struktur Pengurus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <section>
                    <h2 className="mb-3 text-xl font-bold">DKM At-Taqwa PBH</h2>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Ketua:</strong> {pengurus.dkm.ketua}</li>
                      <li><strong>Wakil Ketua:</strong> {pengurus.dkm.wakilKetua}</li>
                      <li><strong>Sekretaris:</strong> {pengurus.dkm.sekretaris}</li>
                      <li><strong>Wakil Sekretaris:</strong> {pengurus.dkm.wakilSekretaris}</li>
                    </ul>
                    <div className="grid grid-cols-1 gap-4 mt-4 text-gray-700 md:grid-cols-2">
                      {Object.entries(pengurus.dkm.bidang).map(([bidang, anggota]) => (
                        <div key={bidang}>
                          <h3 className="font-semibold">{bidang}</h3>
                          <ul className="pl-6 list-disc">
                            {anggota.map((nama) => (
                              <li key={nama}>{nama}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="mb-3 text-xl font-bold">Panitia Pembangunan</h2>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Ketua:</strong> {pengurus.pembangunan.ketua}</li>
                      <li><strong>Sekretaris:</strong> {pengurus.pembangunan.sekretaris}</li>
                      <li><strong>Bendahara:</strong> {pengurus.pembangunan.bendahara}</li>
                      <li><strong>Wakil Bendahara:</strong> {pengurus.pembangunan.wakilBendahara}</li>
                      <li><strong>Perencanaan:</strong> {pengurus.pembangunan.perencanaan}</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  )
}
