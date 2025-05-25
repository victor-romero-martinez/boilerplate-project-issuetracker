const URI = 'https://issue-tracker.freecodecamp.rocks/api/issues'


/** Issue fetcher fn */
function IssueHander() {
    /**
     * Get issues
     * @param {string} project project name
     * @param {any} query query params
     */
    this.get = async function (project, query) {
        let new_query = ''

        for (const [k, v] of Object.entries(query)) {
            new_query += `${k}=${v}&` 
        }

        try {
            const response = await fetch(`${URI}/${project}${query ? `?${new_query}`: ''}`)
            const result = await response.json()

            return { status: response.status, result }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Submit an issue
     * @param {string} project project name
     * @param {Record<string, any>} data payload
     */
    this.post = async function (project, data) {
        try {
            const response = await fetch(`${URI}/${project}`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await response.json()

            return { status: response.status, result }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Update an issue
     * @param {string} project project name
     * @param {Record<string, any} data 
     */
    this.put = async function (project, data) {
        try {
            const response = await fetch(`${URI}/${project}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(data)
            })
            const result = await response.json()

            return { status: response.status, result }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Delete an issue
     * @param {string} project project name
     * @param {string} id issue _id
     */
    this.delete = async function (project, id) {
        try {
            const response = await fetch(`${URI}/${project}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'DELETE',
                body: JSON.stringify({ '_id': id })
            })
            const result = await response.json()

            return { status: response.status, result }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = IssueHander