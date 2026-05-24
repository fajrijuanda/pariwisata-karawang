import DetailPage from '@/components/DetailPage';

export default async function AgendaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPage
      id={id}
      endpoint="agendas"
      backHref="/agenda"
      imageField="poster"
      titleField="event_name"
      textField="description"
      meta={(item) => item.location || 'Agenda'}
      facts={[
        ['Lokasi', (item) => item.location],
        ['Tanggal mulai', (item) => item.start_date],
        ['Tanggal selesai', (item) => item.end_date],
      ]}
    />
  );
}
