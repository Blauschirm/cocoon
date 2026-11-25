import { describe, expect, it } from 'vitest';
import { OPENCODE_STATUS_PLUGIN, installHooksScript } from './hooks.ts';
import { STATUS_BIN } from './tmux.ts';

describe('OpenCode status plugin', () => {
  // OpenCode has no hook configuration of its own, so the status arrives as a plugin that calls cocoon-status.
  it('is written into the global OpenCode plugin directory at sandbox setup', () => {
    expect(installHooksScript).toMatch(/mkdir -p [^\n]*"\$HOME\/\.config\/opencode\/plugins"/);
    expect(installHooksScript).toContain('> "$HOME/.config/opencode/plugins/cocoon-status.ts"');
  });

  it('reports busy sessions and the end of a turn through cocoon-status', () => {
    expect(OPENCODE_STATUS_PLUGIN).toContain(STATUS_BIN);
    expect(OPENCODE_STATUS_PLUGIN).toContain("'session.status'");
    expect(OPENCODE_STATUS_PLUGIN).toContain("'session.idle'");
    expect(OPENCODE_STATUS_PLUGIN).toContain("report('done')");
    // Inert outside CoCoon: without the agent id the status script does nothing anyway.
    expect(OPENCODE_STATUS_PLUGIN).toContain('COCOON_AGENT_ID');
  });
});
