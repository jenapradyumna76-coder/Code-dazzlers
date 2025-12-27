#include <iostream>
#include <fstream>
#include <string>
#include <chrono>
#include <vector>

using namespace std;
using namespace std::chrono;

struct WipeResult {
    long long bytesRemoved;
    double timeTaken;
};

WipeResult performFullWipe(string path) {
    auto start = high_resolution_clock::now();
    ifstream reader(path, ios::binary | ios::ate);
    if (!reader.is_open()) return {0, 0};
    long long fileSize = reader.tellg();
    reader.close();

    for (int layer = 1; layer <= 3; layer++) {
        ofstream writer(path, ios::binary | ios::trunc);
        char pattern = (layer == 1) ? '0' : (layer == 2 ? '1' : '#');
        for (long long i = 0; i < fileSize; i++) writer.put(pattern);
        writer.close();
        cout << "[Processing] Pass " << layer << " complete..." << endl;
    }

    auto stop = high_resolution_clock::now();
    return {fileSize, duration<double>(stop - start).count()};
}

void generateVisualReport(string client, string id, string tech, WipeResult res) {
    ofstream html("VisualReport.html");
    html << "<!DOCTYPE html><html><head><style>"
         << "body { background: #0f172a; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }"
         << ".card { background: #1e293b; padding: 40px; border-radius: 20px; border: 1px solid #334155; width: 500px; text-align: center; }"
         << ".status { color: #10b981; font-weight: bold; font-size: 24px; margin-bottom: 20px; }"
         << ".detail { margin: 10px 0; color: #94a3b8; }"
         << "span { color: #38bdf8; font-weight: bold; }"
         << "</style></head><body><div class='card'>"
         << "<div class='status'>✓ DESTRUCTION COMPLETE</div>"
         << "<h2>Certificate of Sanitization</h2>"
         << "<div class='detail'>Client: <span>" << client << "</span></div>"
         << "<div class='detail'>Order ID: <span>#" << id << "</span></div>"
         << "<div class='detail'>Bytes Overwritten: <span>" << res.bytesRemoved << "</span></div>"
         << "<div class='detail'>Technician: <span>" << tech << "</span></div>"
         << "<br><button onclick='window.print()'>Download PDF Report</button>"
         << "</div></body></html>";
    html.close();
}

int main() {
    string path, id, client, tech;
    cout << "ECOSECURE BACKEND ENGINE\n------------------------\n";
    cout << "Client Name: "; getline(cin, client);
    cout << "Order ID:    "; getline(cin, id);
    cout << "Technician:  "; getline(cin, tech);
    cout << "File Path:   "; getline(cin, path);

    if (!path.empty() && (path.front() == '"')) { path.erase(0, 1); path.erase(path.size() - 1); }

    WipeResult res = performFullWipe(path);
    if (res.bytesRemoved > 0) {
        generateVisualReport(client, id, tech, res);
        cout << "\n[SUCCESS] Report generated: VisualReport.html\n";
    } else {
        cout << "\n[ERROR] File access denied.\n";
    }
    system("pause");
    return 0;
}