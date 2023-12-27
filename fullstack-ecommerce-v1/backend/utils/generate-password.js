const bcrypt = require('bcrypt');

const defaultPassword = 'your_password_here';

const generatePassword = async (password) => {
  try {
    console.log(`Password value without hashing: ${password}`);
    const saltRounds = 10; // Number of salt rounds, higher values increase security but also processing time
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Generated password:', hashedPassword);
  } catch (error) {
    console.error('Error generating password:', error);
  }
};

const cliArgument = process.argv[2] ?? defaultPassword;

generatePassword(cliArgument);
