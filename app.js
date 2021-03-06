// Book Constructor - Creates Book object
function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

}

// UI Constructor - Set of prototype methods - add to book, show alert, delete book.
function UI() {

}

// Add book to list
UI.prototype.addBookToList = function (book) {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
        list.appendChild(row);
}

// Show Alert

UI.prototype.showAlert = function (message, className) {
        // Create div
        const div = document.createElement('div');
        // Add class
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert Alert - first one is what you want to put in (div), second intake is what you want it to go before (form)
        // Container is what you're inserting inside. 
        container.insertBefore(div, form)
        // Timeout after 3 seconds
        setTimeout(function () {
                document.querySelector('.alert').remove();
        }, 3000);
}

// Delete Book

UI.prototype.deleteBook = function(target) {
        if(target.className === 'delete') {
                target.parentElement.parentElement.remove();
                // Show message
                this.showAlert('Book removed', 'success');
        }
}


// Clear fields

UI.prototype.clearFields = function () {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
}

// Event Listener for Add Book

document.getElementById('book-form').addEventListener('submit',
        function (e) {

                // Get form entry values
                const title = document.getElementById('title').value,
                        author = document.getElementById('author').value,
                        isbn = document.getElementById('isbn').value

                // Instantiate book - create a book object
                const book = new Book(title, author, isbn);

                // Instantiate UI
                const ui = new UI();

                // Validate
                if (title === '' || author === '' || isbn === '') {
                        ui.showAlert('Please fill in all fields', 'error');
                } else {
                        // Add book to list
                        ui.addBookToList(book);
                        //Show sucess
                        ui.showAlert('Book Added!', 'success');
                        // Clear Fields
                        ui.clearFields();
                }

                e.preventDefault();
        });

// Event Listener for Delete

document.getElementById('book-list').addEventListener('click', function(e){
        
        // Instantiate UI
        const ui = new UI();
        // Delete book
        ui.deleteBook(e.target);

        e.preventDefault();
})