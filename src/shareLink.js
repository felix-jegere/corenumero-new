// Shareable reading links look like: #n=Jane%20Doe&d=1990-05-15
// Kept in its own module (no components) so react-refresh stays happy.

const MAX_NAME_LENGTH = 100;

export const buildShareHash = (name, dob) =>
  `#n=${encodeURIComponent(name)}&d=${encodeURIComponent(dob)}`;

export const parseSharedInput = (hash = window.location.hash) => {
  try {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const name = (params.get('n') ?? '').slice(0, MAX_NAME_LENGTH);
    const dob = params.get('d') ?? '';
    return {
      name,
      dob: /^\d{4}-\d{2}-\d{2}$/.test(dob) ? dob : '',
    };
  } catch {
    return { name: '', dob: '' };
  }
};
