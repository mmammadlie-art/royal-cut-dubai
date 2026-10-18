const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();


document.getElementById('bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const form = new FormData(event.target);

  const message =
    `Hi Royal Cut Dubai! I'd like to book an appointment.\n\n` +
    `Name: ${form.get('name')}\n` +
    `Phone: ${form.get('phone')}\n` +
    `Service: ${form.get('service')}\n` +
    `Date: ${form.get('date')}\n` +
    `Preferred time: ${form.get('time')}`;

  const whatsappNumber = "971501234567";

const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  document.getElementById('formNote').textContent =
  'Demo booking request prepared. No real appointment has been booked.';

  // window.open(whatsappUrl, '_blank');

const confirmation = document.getElementById('bookingConfirmation');
const details = document.getElementById('confirmationDetails');

const selectedTime = event.target.querySelector('[name="time"]');
const timeLabel = selectedTime.selectedOptions[0].textContent;

details.textContent =
  `Service: ${form.get('service')} | ` +
  `Date: ${form.get('date')} | ` +
  `Time: ${timeLabel}`;

confirmation.hidden = false;
});
const bookingDate = document.getElementById('bookingDate');

if (bookingDate) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split('T')[0];

  bookingDate.min = localDate;
}
const bookingTime = document.getElementById("bookingTime");

function updateAvailableTimes() {
  if (!bookingDate || !bookingTime) return;

  const now = new Date();
  const localToday = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  const selectedDate = bookingDate.value;

  for (const option of bookingTime.options) {
    if (!option.value) continue;

    const [hour, minute] = option.value.split(":").map(Number);

    const isPastTime =
      selectedDate === localToday &&
      (hour * 60 + minute <=
        now.getHours() * 60 + now.getMinutes());

    option.disabled = isPastTime;
  }

  if (bookingTime.selectedOptions[0]?.disabled) {
    bookingTime.value = "";
  }
}

bookingDate?.addEventListener("change", updateAvailableTimes);
updateAvailableTimes();