"use client";

import { AnnouncementForm } from "@/components/announcement-form";
import { getPengumumanById } from "@/lib/services/PengumumanService";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function EditAnnouncementPageClient({ params }) {
  const router = useRouter();

  const id = params?.value ? JSON.parse(params.value)?.id : undefined;

  const {
    data: announcement,
    error,
    isLoading,
  } = useSWR(id ? `announcement-${id}` : null, () => getPengumumanById(id));

  console.log('Event : ', event)
  console.log("Error : ", error)
  console.log("IsLoading : ", isLoading)
  console.log("ID : ", id)

  if (isLoading)
    return <div className="p-8 text-center">Loading event data...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load event data
      </div>
    );
  if (!announcement)
    return <div className="p-8 text-center text-red-500">Pengumuman not found</div>;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Pengumuman</h1>
      <AnnouncementForm initialData={announcement} isEditing={true} />
    </div>
  );
}
