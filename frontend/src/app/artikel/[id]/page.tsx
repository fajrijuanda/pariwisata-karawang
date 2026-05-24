import DetailPage from '@/components/DetailPage';

export default async function ArtikelDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPage
      id={id}
      endpoint="artikels"
      backHref="/artikel"
      imageField="thumbnail"
      titleField="title"
      textField="content"
      facts={[
        ['Penulis', (item) => item.author],
        ['Kategori', (item) => item.category],
        ['Tanggal rilis', (item) => item.published_at],
      ]}
    />
  );
}
