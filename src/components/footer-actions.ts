// Footer action bar: New / Edit / Quick Report buttons.

namespace CustomerDetails.Components {

  export function renderFooterActions(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'footer-actions';

    function makeBtn(label: string, modifier: string, iconText: string): HTMLButtonElement {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn btn--${modifier}`;

      if (iconText) {
        const icon = document.createElement('span');
        icon.className = 'btn-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = iconText;
        btn.appendChild(icon);
      }

      btn.appendChild(document.createTextNode(label));
      return btn;
    }

    const newBtn  = makeBtn('New', 'primary', '＋');
    const editBtn = makeBtn('Edit', 'secondary', '✎');
    const reportBtn = makeBtn('Quick Report', 'outlined', '');

    // TODO: wire up action handlers when backend is added
    newBtn.addEventListener('click',    () => { /* new customer handler */ });
    editBtn.addEventListener('click',   () => { /* edit handler */ });
    reportBtn.addEventListener('click', () => { /* quick report handler */ });

    const spacer = document.createElement('div');
    spacer.className = 'footer-actions__spacer';

    footer.appendChild(newBtn);
    footer.appendChild(editBtn);
    footer.appendChild(spacer);
    footer.appendChild(reportBtn);

    return footer;
  }

}
