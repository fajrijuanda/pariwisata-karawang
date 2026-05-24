import DetailPage from '@/components/DetailPage';

export default async function BudayaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPage
      id={id}
      endpoint="budayas"
      backHref="/budaya"
      imageField="photo_gallery"
      titleField="name"
      textField="description"
      facts={[
        ['Kategori', (item) => item.category],
        ['Sejarah', (item) => typeof item.history === 'string' ? item.history.replace(/<[^>]*>?/gm, '').slice(0, 180) : null],
      ]}
    />
  );
}
