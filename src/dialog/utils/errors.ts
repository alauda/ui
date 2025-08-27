export function throwDialogContentAlreadyAttachedError() {
  throw new Error(
    'Attempting to attach dialog content after content is already attached',
  );
}
