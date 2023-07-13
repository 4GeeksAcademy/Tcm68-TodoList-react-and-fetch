

const createTodoListUser = () => {

    const users = process.argv.slice(2)

    if (!users.length) {

        console.log('usage is: node createTodosUsers user1 user2 user3')

        return;

    }

​

    users.forEach(async userName => {

        const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${userName}`, {

            method: "POST",

            body: JSON.stringify([]),

            headers: {

                "Content-Type": "application/json"

            }

        })

        const createdUser = await response.json()

        console.log(`Creating user for ${userName}`, createdUser);

    })

}

​

createTodoListUser()

