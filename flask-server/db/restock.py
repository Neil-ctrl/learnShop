import psycopg2

def run_sql_file(sql_file):
    conn = psycopg2.connect(
        database="shop",
        user="postgres",
        password="pwd",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()

    with open(sql_file, 'r') as f:
        sql_commands = f.read()
    commands = sql_commands.split(';')

    for command in commands:
        command = command.strip()
        if command:
            try:
                cur.execute(command)
                print(f"Executed: {command[:30]}...")
            except Exception as e:
                print(f"Failed to execute: {command}")
                print(e)

    conn.commit()
    cur.close()
    conn.close()
    print("✅ Database restocked successfully!")

if __name__ == '__main__':
    run_sql_file('restock.sql')
