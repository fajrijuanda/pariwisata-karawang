import CatalogPage from '@/components/CatalogPage';

export default function BudayaPage() {
  return (
    <CatalogPage
      endpoint="budayas"
      route="budaya"
      eyebrow="Budaya"
      title="Cultural Stories With Modern Framing"
      description="Tradisi, seni, sejarah, dan ekspresi lokal Karawang ditampilkan dengan ritme visual yang lebih elegan."
      imageField="photo_gallery"
      titleField="name"
      textField="description"
    />
  );
}
