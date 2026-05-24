import CatalogPage from '@/components/CatalogPage';

export default function DestinasiPage() {
  return (
    <CatalogPage
      endpoint="destinasis"
      route="destinasi"
      eyebrow="Destinasi"
      title="Discover Karawang Destinations"
      description="Jelajahi wisata alam, sejarah, rekreasi keluarga, dan ruang lokal yang membentuk pengalaman Karawang."
      imageField="photo_gallery"
      titleField="name"
      textField="description"
    />
  );
}
