const URI = 'https://issue-tracker.freecodecamp.rocks/api/issues'


/** Issue fetcher fn */
function Issue() {
    /**
     * Get issues
     * @param {string} project project name
     */
    this.get = async function (project) {
        try {
            const response = await fetch(`${URI}/${project}`)
            const data = await response.json()
            return data
        } catch (error) {
            return error
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

            return result
        } catch (error) {
            return error
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

            return result
        } catch (error) {
            return error
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
            const reslult = await response.json()

            return reslult
        } catch (error) {
            return error
        }
    }
}

module.exports = Issue