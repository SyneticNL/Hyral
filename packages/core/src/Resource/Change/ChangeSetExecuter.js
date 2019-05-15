
export default function ChangeSetExecutor(tasks) {
  return {
    /**
     * Executes all actions.
     *
     * @return {Promise}
     */
    execute() {
      return Promise.all(
        tasks
          .sort((a, b) => b.related.length - a.related.length)
          .map(task => task.execute()),
      );
    },
    /**
     * Returns a object describing the current status of the flush action.
     */
    status() {
      return {
        total: tasks.length,
        resolved: tasks.filter(task => task.resolved).length,
      };
    },
  };
}
