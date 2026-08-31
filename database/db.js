// Database helper module for Jagan PG
// Easily switchable between In-Memory, SQLite, or PostgreSQL

const inMemoryDatabase = {
  enquiries: [],
  saveEnquiry(data) {
    const record = {
      id: this.enquiries.length + 1,
      ...data,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    this.enquiries.push(record);
    return record;
  },
  getEnquiries() {
    return this.enquiries;
  }
};

module.exports = {
  db: inMemoryDatabase
};
