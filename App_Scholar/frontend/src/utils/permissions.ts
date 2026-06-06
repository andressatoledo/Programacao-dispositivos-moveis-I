export function canEditAluno(role?: string) {
  return role === "admin";
}

export function canDeleteAluno(role?: string) {
  return role === "admin";
}

export function canViewAluno(role?: string) {
  return role === "admin" || role === "professor";
}