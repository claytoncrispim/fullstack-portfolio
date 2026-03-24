# Start Frontend
# If npm is already installed, you can run this command to start the frontend server.
start-frontend: 
	cd frontend && npm run dev

# If npm is not installed, you can run this command to install npm and start the frontend server.
install-frontend:
	cd frontend && npm install && npm run dev