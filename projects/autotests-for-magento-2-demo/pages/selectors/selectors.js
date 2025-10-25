export const headerSelectors = {
  signInLink: ".header .authorization-link",
  createAccountLink: "//a[text()='Create an Account']",
  welcomeMessage: ".header .logged-in",
};

export const signInPageSelectors = {
  signInPageTitle: `[data-ui-id="page-title-wrapper"]`,
  emailField: ".form-login #email",
  passwordField: ".form-login #password",
  signInButton: ".form-login .primary#send2",
  topErrorMessage: `[data-ui-id="message-error"]`,
  forgotPasswordLink: `//a[text()='Forgot Your Password?']`,
};

export const mainPageSelectors = {
  pageTitle: `div[data-element="main"] h1`,
};

export const registrationPageSelectors = {
  registrationPageTitle: `[data-ui-id="page-title-wrapper"]`,
  firstNameField: ".form-create-account #firstname",
  lastNameField: ".form-create-account #lastname",
  newsletterCheckbox: ".form-create-account #is_subscribed",
  remoteShoppingCheckbox: ".form-create-account #assistance_allowed_checkbox",
  emailField: ".form-create-account #email_address",
  passwordField: ".form-create-account #password",
  confirmPasswordField: ".form-create-account #password-confirmation",
  showPasswordCheckbox: ".form-create-account #show-password",
  createAnAccountButton: ".form-create-account #send2",
  topErrorMessage: `[data-ui-id="message-error"]`,
};

export const forgotPasswordPageSelectors = {
  email: ".password #email_address",
};

export const myAccounPageSelectors = {
  myAccountPageTitle: `[data-ui-id="page-title-wrapper"]`,
  editContactInfoLink: "a[href='https://magento2demo.firebearstudio.com/customer/account/edit/']",
  changePasswordLink:
    "a[href='https://magento2demo.firebearstudio.com/customer/account/edit/changepass/1/']",
  editNewslettersLink: "a[href='https://magento2demo.firebearstudio.com/newsletter/manage/']",
  manageAdressessLink: "a[href='https://magento2demo.firebearstudio.com/customer/address/']",
  editBillingAdressLink:
    "a[href='https://magento2demo.firebearstudio.com/customer/address/edit/id/1/']",
  editShippingAdressLink:
    "a[href='https://magento2demo.firebearstudio.com/customer/address/edit/id/1/']",
};

export const navigationSelectors = {
  mainLogo: "a.logo",
  searchField: ".block-search #search",
  cartIcon: ".minicart-wrapper",
  navMenu: {
    items: [
      { name: "What's New", selector: ".nav-1", items: [] },
      {
        name: "Women",
        selector: ".nav-2",
        items: [
          {
            name: "Tops",
            selector: ".nav-2-1",
            items: [
              { name: "Jackets", selector: ".nav-2-1-1" },
              { name: "Hoodies & Sweatshirts", selector: ".nav-2-1-2" },
              { name: "Tees", selector: ".nav-2-1-3" },
              { name: "Bras & Tanks", selector: ".nav-2-1-4" },
            ],
          },
          {
            name: "Bottoms",
            selector: ".nav-2-2",
            items: [
              { name: "Pants", selector: ".nav-2-2-1" },
              { name: "Shorts", selector: ".nav-2-2-2" },
            ],
          },
        ],
      },
      {
        name: "Men",
        selector: ".nav-3",
        items: [
          {
            name: "Tops",
            selector: ".nav-3-1",
            items: [
              { name: "Jackets", selector: ".nav-3-1-1" },
              { name: "Hoodies & Sweatshirts", selector: ".nav-3-1-2" },
              { name: "Tees", selector: ".nav-3-1-3" },
              { name: "Bras & Tanks", selector: ".nav-3-1-4" },
            ],
          },
          {
            name: "Bottoms",
            selector: ".nav-3-2",
            items: [
              { name: "Pants", selector: ".nav-3-2-1" },
              { name: "Shorts", selector: ".nav-3-2-2" },
            ],
          },
        ],
      },
      {
        name: "Gear",
        selector: ".nav-4",
        items: [
          { name: "Bags", selector: ".nav-4-1" },
          { name: "Fitness Equipment", selector: ".nav-4-2" },
          { name: "Watches", selector: ".nav-4-3" },
        ],
      },
      {
        name: "Training",
        selector: ".nav-5",
        items: [{ name: "Video Download", selector: ".nav-5-1" }],
      },
      { name: "Sale", selector: ".nav-6", items: [] },
    ],
  },
};
