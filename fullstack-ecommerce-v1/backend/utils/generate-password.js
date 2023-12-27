const bcrypt = require('bcrypt');

const generatePassword = async () => {
  try {
    const password = 'your_password_here';
    const saltRounds = 10; // Number of salt rounds, higher values increase security but also processing time
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Generated password:', hashedPassword);
  } catch (error) {
    console.error('Error generating password:', error);
  }
};

generatePassword();
