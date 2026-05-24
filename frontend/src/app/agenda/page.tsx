import CatalogPage from '@/components/CatalogPage';

export default function AgendaPage() {
  return (
    <CatalogPage
      endpoint="agendas"
      route="agenda"
      eyebrow="Agenda"
      title="Events Across Karawang"
      description="Kalender kegiatan daerah, festival, pameran, dan acara publik yang bisa diikuti masyarakat."
      imageField="poster"
      titleField="event_name"
      textField="description"
      metaField="location"
    />
  );
}
