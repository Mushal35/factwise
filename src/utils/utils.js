export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age + " years";
};

export const extractNames = (fullName) => {
  const names = fullName.split(" ");
  const first = names[0];
  const last = names.length > 1 ? names.slice(1).join(" ") : ""; // Handle case where only first name is provided
  return {first, last};
};
