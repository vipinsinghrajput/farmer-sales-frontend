const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src', 'app', 'services');

fs.readdirSync(servicesDir).forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove headers: this.getAuthHeaders() with or without trailing comma
    content = content.replace(/headers:\s*this\.getAuthHeaders\(\),?/g, '');
    
    // Remove the getAuthHeaders method entirely
    content = content.replace(/private\s+getAuthHeaders\(\)\s*:\s*HttpHeaders\s*\{[\s\S]*?\}\s*\}\s*?\n/g, '');
    
    // Clean up empty options objects like {} or { params: params } leaving trailing commas etc.
    // That's harder, let's just do the basic cleanup first.
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Done cleaning getAuthHeaders');
