<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#scooter-manager)

# ➤ Scooter Manager


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#overview)

## ➤ Overview

Scooter Manager is a web application designed for managing a fleet of scooters. It enables users to add, edit, delete, and view scooters along with their details, such as serial number, model, battery level, image URL, color, and status.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#features)

## ➤ Features

- **Add Scooter**: Easily add new scooters with required details.
- **Edit Scooter**: Update the details of existing scooters.
- **Delete Scooter**: Remove scooters from the list.
- **View Scooter List**: Display all scooters in a sortable and filterable table.
- **Responsive Design**: Optimized for different screen sizes.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#technologies-used)

## ➤ Technologies Used

- **HTML**: For the structure of the application.
- **CSS**: For styling the application (via `style.css`).
- **TypeScript**: For implementing application logic with type safety.
- **Fetch API**: For making asynchronous requests to a mock API.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#file-structure)

## ➤ File Structure

/scooter-manager │ ├── index.html # Main HTML file ├── style.css # Styles for the application ├── script.ts # TypeScript logic for managing scooters ├── ScooterCrud.ts # Contains the Scooter interface and CRUD operations └── tableSortAndFilter.ts # Functions for sorting and filtering the scooter table


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#getting-started)

## ➤ Getting Started

### Prerequisites

- Node.js and npm (for TypeScript compilation)
- A modern web browser

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/scooter-manager.git
   ```
2. **Navigate to the project directory**:
   cd scooter-manager
3. **Install dependencies (if any)**:
   npm install
4. **Open index.html in your browser to view the application.**

Usage

1. Add a Scooter: Fill out the form in the "Add Scooter" section and click "Add Scooter".
2. Edit a Scooter: Click the "EDIT" button next to a scooter in the list, make changes, and click "Save Changes".
3. Delete a Scooter: Click the "REMOVE" button next to the scooter you wish to delete.
4. Filter and Sort: Use the search inputs and click on the table headers to filter and sort the scooter list.
   API Endpoints
   This application communicates with a mock API hosted at:
