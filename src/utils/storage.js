const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function loadTickets(userId) {
  const raw = localStorage.getItem(TICKETS_KEY)
  const allTickets = raw ? JSON.parse(raw) : []
  return allTickets.filter(t => t.userId === userId)
}

export function addTicket(userId, ticket) {
  const raw = localStorage.getItem(TICKETS_KEY)
  const allTickets = raw ? JSON.parse(raw) : []
  const newTicket = { ...ticket, userId }
  allTickets.push(newTicket)
  localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets))
  return allTickets.filter(t => t.userId === userId)
}

export function updateTicket(userId, updatedTicket) {
  const raw = localStorage.getItem(TICKETS_KEY)
  let allTickets = raw ? JSON.parse(raw) : []
  allTickets = allTickets.map(t => t.id === updatedTicket.id && t.userId === userId ? updatedTicket : t)
  localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets))
  return allTickets.filter(t => t.userId === userId)
}

export function deleteTicket(userId, ticketId) {
  const raw = localStorage.getItem(TICKETS_KEY)
  let allTickets = raw ? JSON.parse(raw) : []
  allTickets = allTickets.filter(t => !(t.id === ticketId && t.userId === userId))
  localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets))
  return allTickets.filter(t => t.userId === userId)
}
