===========================================================
♻️  ECO-SECURE: HYBRID DATA DESTRUCTION SUITE
===========================================================

Project Version: 1.0
Author: [Your Name]
Platform: Windows (C++ Engine + Web Dashboard)

--- 📁 PROJECT STRUCTURE ---

/EcoSecure_Final
│
├── SecureWipe.exe       <-- The "Brain" (C++ Shredding Engine)
├── index.html           <-- The "Front Door" (Sign-up page)
├── login.html           <-- User Authentication
├── dashboard.html       <-- The Main Control Panel
├── VisualReport.html    <-- The generated Certificate (Created after wipe)
└── README.txt           <-- You are here!

--- 🚀 HOW TO RUN THE DEMO ---

STEP 1: THE INTERFACE
Double-click 'index.html' to open the app in your browser. 
Create an account and log in to reach the Dashboard.

STEP 2: THE DESTRUCTION
While the dashboard is open, run 'SecureWipe.exe'.
When prompted, type the name of the file you want to delete.
(Tip: Create a 'test.txt' file first to try it out!)

STEP 3: THE AUDIT
Once the C++ window says "Success," go back to your browser 
Dashboard and click "View Latest Certificate" or "Audit Reports."
You will see the official Destruction Certificate appear.

--- 🛠️ TECHNICAL NOTES ---

- RECOMPILING: If you change the C++ code, use the command:
  g++ SecureWipe.cpp -o SecureWipe.exe

- DATA FLOW: This app uses "File-Based Integration." The C++ 
  engine writes the 'VisualReport.html' file, which the 
  Dashboard then displays to the user.

- SECURITY: This engine uses a multi-pass overwrite pattern
  consistent with NIST 800-88 guidelines.

===========================================================
                 "Secure Data, Green Earth"
===========================================================
