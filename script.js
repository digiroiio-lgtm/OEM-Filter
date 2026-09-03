document.querySelector('#rfq-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  if (!this.checkValidity()) {
    status.textContent = 'Please complete the required fields before submitting.';
    this.reportValidity();
    return;
  }
  status.textContent = 'Thank you. Your RFQ is ready to be reviewed by our sourcing team.';
  this.reset();
});
