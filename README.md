# TSProjectMaker

A simple CLI tool to quickly scaffold a new TypeScript project with a pre-configured structure and essential development tools.

---

## 🚀 Features

*   **Quick Setup:** Initialize a new TypeScript project in seconds.
*   **Pre-configured:** Comes with `eslint`, `prettier`, `jest`, and `typescript` already set up.
*   **Modular Structure:** Organizes your project with a clean and maintainable file structure.
*   **Customizable:** Easily modify the configurations to fit your specific needs.

---

## 📦 Dev Packages

| Package    | Purpose                                  |
| :--------- | :--------------------------------------- |
| **eslint**   | Code linting and style enforcement       |
| **prettier** | Code formatting                          |
| **jest**     | JavaScript/TypeScript testing framework |
| **typescript** | TypeScript language support            |

---

## 🛠️ Installation

```bash
npm install -g https://github.com/fox3000foxy/Ts-Project-Maker
```

## 💻 Usage

```bash
npx ts-project-maker my-new-project # Example: npx ts-project-maker -t api --name test-api --author your-username
cd my-new-project
npm install
npm run dev
```

## 🔗 npm link

For development purposes, you can use `npm link` to test your local changes:

```bash
# In the TSProjectMaker directory
npm link

# In your test project directory
npm link ts-project-maker
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bug fixes, feature requests, or improvements.
