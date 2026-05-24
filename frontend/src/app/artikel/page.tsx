import CatalogPage from '@/components/CatalogPage';

export default function ArtikelPage() {
  return (
    <CatalogPage
      endpoint="artikels"
      route="artikel"
      eyebrow="Artikel"
      title="Insights From Karawang"
      description="Artikel dan cerita pilihan untuk memperkaya konteks wisata, budaya, ekonomi kreatif, dan agenda lokal."
      imageField="thumbnail"
      titleField="title"
      textField="content"
    />
  );
}
