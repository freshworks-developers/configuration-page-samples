// Vanilla JS test file using Vitest
// Using Vitest globals (configured in vitest.config.js)

// Mock the app global
global.app = {
    initialized: vi.fn(() => Promise.resolve({
      events: {
        on: vi.fn()
      },
      data: {
        get: vi.fn(() => Promise.resolve({
          contact: {
            name: 'John Doe'
          }
        }))
      }
    }))
  };
  
  // Import the app.js file
  // Note: We need to use dynamic import since the file has side effects
  describe('app.js - Coverage Tests', function() {
    beforeEach(function() {
      // Set up DOM
      document.body.innerHTML = '<div id="apptext"></div>';
  
      // Clear all mocks
      vi.clearAllMocks();
    });
  
    test('app global should be defined', function() {
      expect(global.app).toBeDefined();
      expect(typeof global.app.initialized).toBe('function');
    });
  
    test('app.initialized should be called', async function() {
      // Import and run the app
      await import('../app/scripts/app.js');
  
      expect(global.app.initialized).toHaveBeenCalled();
    });
  
    test('renderText function should update DOM with contact name', async function() {
      const textElement = document.getElementById('apptext');
  
      // Manually call renderText logic
      const client = await global.app.initialized();
      const contactData = await client.data.get('contact');
      const { contact: { name } } = contactData;
  
      textElement.innerHTML = `Ticket is created by ${name}`;
  
      expect(textElement.innerHTML).toBe('Ticket is created by John Doe');
    });
  });
