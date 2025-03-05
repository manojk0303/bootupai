async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Use subtle crypto for hashing
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }
  
  async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const computedHash = await hashPassword(password);
    return computedHash === hashedPassword;
  }
  
  export { hashPassword, comparePassword };