export const handleEnter = event => {
  if (event.key.toLowerCase() === 'enter') {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);

    if (form.elements[index + 1].innerText === 'BACK') {
      form.elements[index + 2].focus();
    } else {
      form.elements[index + 1].focus();
    }

    event.preventDefault();
  }
};
