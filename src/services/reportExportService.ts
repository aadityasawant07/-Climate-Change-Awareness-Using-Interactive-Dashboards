import { UserProfile, AssessmentHistoryRecord, SavedCityRecord, ClimateAlertRecord } from '../types/user';

function triggerCSVDownload(filename: string, rows: (string | number)[][], headers: string[]) {
  const csvContent = 'data:text/csv;charset=utf-8,' + 
    [headers.join(','), ...rows.map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const reportExportService = {
  exportUsersToCSV(users: UserProfile[]) {
    const headers = ['User ID', 'Full Name', 'Email Address', 'Role', 'Registration Date'];
    const rows = users.map(u => [u.id, u.name, u.email, u.role, u.createdAt]);
    triggerCSVDownload('ecopulse_users_dataset', rows, headers);
  },

  exportAssessmentsToCSV(assessments: AssessmentHistoryRecord[]) {
    const headers = ['Assessment ID', 'User ID', 'Score (0-100)', 'Grade', 'CO2 Avoided (kg/yr)', 'Trees Equivalent', 'Practices Count', 'Date'];
    const rows = assessments.map(a => [
      a.id,
      a.userId,
      a.score,
      a.grade,
      a.co2SavedKg,
      a.treesEquivalent,
      a.answers?.length || 0,
      a.createdAt
    ]);
    triggerCSVDownload('ecopulse_climate_assessments', rows, headers);
  },

  exportAlertsToCSV(alerts: ClimateAlertRecord[]) {
    const headers = ['Alert ID', 'Type', 'Severity', 'Location', 'Title', 'Description', 'Action Guidance', 'Status', 'Date'];
    const rows = alerts.map(a => [
      a.id,
      a.type,
      a.severity,
      a.location,
      a.title,
      a.description,
      a.recommendedAction,
      a.resolved ? 'Resolved' : 'Active',
      a.createdAt
    ]);
    triggerCSVDownload('ecopulse_environmental_alerts', rows, headers);
  },

  exportLocationsToCSV(locations: SavedCityRecord[]) {
    const headers = ['Location ID', 'User ID', 'City Name', 'Country', 'Latitude', 'Longitude', 'Date Pinned'];
    const rows = locations.map(l => [l.id, l.userId, l.cityName, l.country, l.latitude, l.longitude, l.createdAt]);
    triggerCSVDownload('ecopulse_saved_observatories', rows, headers);
  },

  printReport() {
    window.print();
  }
};
