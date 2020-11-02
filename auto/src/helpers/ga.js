export function outboundClick(name = 'outbound') {
  this.$gtag.query('event', 'download', {
    'event_category' : name,
    'event_label' : this.tcURL
  });
}
export function outboundLinkClick(name = 'outbound') {
  this.$gtag.query('event', 'click', {
    'event_category': name,
    'event_label': this.tcURL
  });
}
