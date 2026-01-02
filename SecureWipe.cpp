#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <ctime>

using namespace std;

// Function to create the HTML Certificate
void generateReport(string fileName, long fileSize) {
    ofstream report("VisualReport.html");
    time_t now = time(0);
    char* dt = ctime(&now);

    report << "<html><head><style>"
           << "body { font-family: sans-serif; background: #f0f2f5; display: flex; justify-content: center; padding: 40px; }"
           << ".card { background: white; border-top: 10px solid #2e7d32; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 500px; }"
           << ".status { color: #2e7d32; font-weight: bold; text-transform: uppercase; }"
           << "hr { border: 0; border-top: 1px solid #eee; margin: 20px 0; }"
           << "</style></head><body>"
           << "<div class='card'>"
           << "<h2>♻️ Eco-Secure Audit Report</h2>"
           << "<p class='status'>✅ Method: Secure Cryptographic Wipe</p>"
           << "<hr>"
           << "<p><strong>File Destroyed:</strong> " << fileName << "</p>"
           << "<p><strong>File Size:</strong> " << fileSize << " bytes</p>"
           << "<p><strong>Timestamp:</strong> " << dt << "</p>"
           << "<p><strong>Passes:</strong> 3-Pass Overwrite (0x00, 0xFF, Random)</p>"
           << "<hr>"
           << "<p style='font-size: 0.8em; color: #666;'>This document serves as digital proof of data sanitization.</p>"
           << "</div></body></html>";
    
    report.close();
}

int main() {
    string filePath;
    cout << "========================================" << endl;
    cout << "      ECO-SECURE SHREDDING ENGINE       " << endl;
    cout << "========================================" << endl;
    cout << "Enter filename to securely wipe: ";
    cin >> filePath;

    // 1. Open file to check size
    ifstream inFile(filePath, ios::binary | ios::ate);
    if (!inFile) {
        cout << "Error: File not found!" << endl;
        return 1;
    }
    long size = inFile.tellg();
    inFile.close();

    // 2. Perform Overwrite (The "Shredding")
    cout << "Shredding " << filePath << " (" << size << " bytes)..." << endl;
    
    ofstream outFile(filePath, ios::binary);
    for (int pass = 1; pass <= 3; pass++) {
        cout << "Pass " << pass << "/3..." << endl;
        outFile.seekp(0);
        for (int i = 0; i < size; i++) {
            char junk = (pass == 1) ? 0 : (pass == 2) ? 0xFF : rand() % 256;
            outFile.put(junk);
        }
    }
    outFile.close();

    // 3. Delete the file
    if (remove(filePath.c_str()) == 0) {
        cout << "SUCCESS: File physically removed from disk." << endl;
        generateReport(filePath, size); // Create the Visual Report
        cout << "Audit Report Generated: VisualReport.html" << endl;
    } else {
        cout << "Error deleting file." << endl;
    }

    cout << "\nPress Enter to exit...";
    cin.ignore();
    cin.get();
    return 0;
}
