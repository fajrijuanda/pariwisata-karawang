import DetailPage from '@/components/DetailPage';

export default async function DestinasiDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPage
      id={id}
      endpoint="destinasis"
      backHref="/destinasi"
      imageField="photo_gallery"
      titleField="name"
      textField="description"
      facts={[
        ['Harga tiket', (item) => item.htm],
        ['Jam operasional', (item) => item.open_hours],
        ['Fasilitas', (item) => typeof item.facilities === 'string' ? item.facilities.replace(/<[^>]*>?/gm, '') : null],
        ['Peta', (item) => item.map_coordinates],
      ]}
    />
  );
}
