export function outboundClick(name = 'outbound') {
  this.$ga.query('send', 'event', name, 'download', this.tcURL);
  this.$gtag.query('event', 'download', {
    'event_category' : name,
    'event_label' : this.tcURL
  });
}
export function outboundLinkClick(name = 'outbound') {
  this.$ga.query('send', 'event', name, 'click', this.tcURL);
  this.$gtag.query('event', 'click', {
    'event_category': name,
    'event_label': this.tcURL
  });
}
