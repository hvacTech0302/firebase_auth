const guideList = document.querySelector('.guides')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details')

//setup UI
const setupUI = user => {
    if (user) {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')

        // get user UID
        db.collection('users').doc(user.uid).get().then(doc => {
            // show user details
            const html = `
        <table class="centered highlight">
            <tr>
                <th>Email Address:</th>
                <td>${user.email}</td>
            </tr>
            <tr>
                <th>Bio:</th>
                <td style="font-style: italic">${doc.data().bio}</td>
            </tr>
        </table>
        `

            accountDetails.innerHTML += html
        })


    } else {
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')

        // remove user details
        accountDetails.innerHTML = ''
    }
}

//setup guides
const setupGuides = data => {
    if (data.length) {
        let html = ''

        data.forEach(doc => {
            const title = doc.data().title
            const content = doc.data().content
            const li = `
                    <li>
                        <div class="collapsible-header grey lighten-4">${title}</div>
                        <div class="collapsible-body white">${content}</div>
                    </li>
                `
            html += li
        })

        guideList.innerHTML = html

    } else {
        guideList.innerHTML = `
        <h5 class="center-align">Login to view guides.</h5>
    `
    }

}



// set up materialize components
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal')
    M.Modal.init(modals)

    const items = document.querySelectorAll('.collapsible')
    M.Collapsible.init(items)
})