import DetailPage from '@/components/DetailPage';

export default async function UmkmDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPage
      id={id}
      endpoint="umkms"
      backHref="/umkm"
      imageField="photo"
      titleField="business_name"
      textField="product_description"
      facts={[
        ['Kategori', (item) => item.category],
        ['Pemilik', (item) => item.owner_name],
        ['WhatsApp', (item) => item.contact_wa],
        ['Ecommerce', (item) => item.ecommerce_link],
      ]}
    />
  );
}
