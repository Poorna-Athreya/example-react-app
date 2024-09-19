const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const logger = require('./logger'); // Assuming there is a logger module for logging

const uri = process.env.MONGO_URI;

/**
 * Updates the user’s password in the database with the new password.
 * @param {string} userId - The ID of the user whose password is to be updated.
 * @param {string} newPassword - The new password to be set.
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if the update operation fails.
 */
async function updatePassword(userId, newPassword) {
    if (!userId || !newPassword) {
        throw new Error('User ID and new password are required.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('yourDatabaseName'); // Replace with your database name
        const usersCollection = database.collection('users');

        const updateResult = await usersCollection.updateOne(
            { _id: userId },
            { $set: { password: hashedPassword } }
        );

        if (updateResult.matchedCount === 0) {
            throw new Error('User not found.');
        }

        if (updateResult.modifiedCount === 0) {
            throw new Error('Password update failed.');
        }

        logger.info(`Password updated successfully for user ID: ${userId}`);
    } catch (error) {
        logger.error(`Error updating password for user ID: ${userId} - Error: ${error.message}`);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { updatePassword };
