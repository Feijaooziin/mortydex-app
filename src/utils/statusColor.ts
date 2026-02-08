export function getStatusColor(status: string) {
  switch (status) {
    case "Alive":
      return "#4CAF50";
    case "Dead":
      return "#F44336";
    default:
      return "#9E9E9E";
  }
}
