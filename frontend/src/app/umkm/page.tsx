import CatalogPage from '@/components/CatalogPage';

export default function UmkmPage() {
  return (
    <CatalogPage
      endpoint="umkms"
      route="umkm"
      eyebrow="UMKM"
      title="Local Products, Premium Presence"
      description="Produk UMKM Karawang dikurasi agar lebih mudah ditemukan, dibaca, dan dihubungi oleh pengunjung."
      imageField="photo"
      titleField="business_name"
      textField="product_description"
    />
  );
}
