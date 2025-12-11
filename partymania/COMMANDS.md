Client
`npm run dev -- --host 0.0.0.0 --port 5173`

WSL
`ip addr show eth0` - shows WSL IP

Powershell
`netsh interface portproxy set v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=<new_WSL2_IP>` - Proxies WSL connection to Windows open port, allowing for hosting from WSL to public outbound.
