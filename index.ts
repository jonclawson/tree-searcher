import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import O from './O.class';
import D3OrgChart from './D3OrgChart';

function constains(n: number, o: O) {
  const values = getAllValues(o);
  return values.includes(n);
}

function getAllValues(x: O): number[] {
  let a = [];
  let b = [];
  const getValues = (y: O): any[] => {
    const l = getValue(y?.left);
    const r = getValue(y?.right);
    return [l || '', r || ''];
  };

  const getValue = (y: O): number => {
    if (y && y.value != null) {
      a.push(y.value);
      return y.value;
    }
  };

  const getLimbs = (y: O): any[] => {
    let vals = getValues(y);
    if (y && y.left) {
      vals[0] = [vals[0], getLimbs(y?.left)];
    }
    if (y && y.right) {
      vals[1] = [vals[1], getLimbs(y?.right)];
    }
    return vals;
  };

  b = [getValue(x), getLimbs(x)];

  return a;
}

function getFlattendList(o: O): any[] {
  const a = [];
  const getO = (y: O) => {
    return {
      id: y.id,
      parentId: y.parentId,
      value: y.value,
    };
  };
  const getLimbs = (y: O) => {
    if (y && y.left) {
      a.push(getO(y.left));
      getLimbs(y.left);
    }
    if (y && y.right) {
      a.push(getO(y.right));
      getLimbs(y.right);
    }
  };
  a.push(getO(o));
  getLimbs(o);
  return a;
}

function run() {
  let depth = 1,
    target = 3;
  document.body.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <span class="navbar-brand text-white">
        Tree Search
      </span>
    </div>
  </nav>
    <div class="container">
      <div>
        <form class="row"> 
          <div class="col-12">
            <h1 class="display-6">A test to traverse a data tree.</h1>
            <p> Adjust the numbers to run the test</p>
          </div>
          <div class="form-inline col">
          <label>Depth</label>
          <input id="depth" class="form-control" type="number" value="${depth}" />
          </div>
          <div class="form-inline col">
          <label>Find Nmber</label>
          <input id="target" class="form-control" type="number" value="${target}" />
          </div>
        </form>
      </div>

      <div class="row">
        <div id="output" class="col mt-3">
        </div>
      </div>
    </div>
  `;

  const test = () => {
    const o = getData(depth);

    const values = getAllValues(o);
    document.querySelector('#output').innerHTML = `
    <div class="alert alert-info">
    <li>Contains ${target}: ${constains(target, o)}</li>
    <li>Left sum: ${o.getLeftValue()}</li>
    <li>right sum: ${o.getRightValue()}</li>
    <li>Larger limb: ${o.getLargerLimb()}</li>
    <li>Count: ${o.getCount()}</li>
    <li>Value: ${o.getValue()}</li>
    <div id="chart"></div>
    </div>

    <div class="accordion" id="accordionExample">
    <div id="scroll-to-bottom" class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Show Log
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <pre class="accordion-body log">
          Values: ${JSON.stringify(values)}
          Tree: ${JSON.stringify(o, null, '\t')}
        </pre>
      </div>
    </div>
    </div>
    <span id="page-bottom">.</span>
`;
    const list = getFlattendList(o);
    new D3OrgChart(list);
  };
  test();
  document.querySelector('input#depth').addEventListener('change', (e) => {
    depth = +(e.target as HTMLInputElement).value;
    test();
  });
  document.querySelector('input#target').addEventListener('change', (e) => {
    target = +(e.target as HTMLInputElement).value;
    test();
  });

  let scrollToBottom = document.querySelector('#scroll-to-bottom');
  let pageBottom = document.querySelector('#page-bottom');

  scrollToBottom.addEventListener('click', function () {
    setTimeout(() => {
      pageBottom.scrollIntoView();
    }, 3000);
  });
}

function getData(depth: number): O {
  let c = 0,
    id = 1,
    pId = 1;
  const rnd = (): number => Math.ceil(Math.random() * 10);
  const o = new O(rnd(), id);
  o.left = new O(rnd(), ++id, o.id);
  o.right = new O(rnd(), ++id, o.id);
  let x = o.left;
  let y = o.right;
  if (depth > 0) {
    do {
      x.left = new O(rnd(), ++id, x.id);
      x.right = new O(rnd(), ++id, x.id);
      y.left = new O(rnd(), ++id, y.id);
      y.right = new O(rnd(), ++id, y.id);
      x = x.left;
      y = y.right;
      c++;
    } while (c < depth);
  }
  return o;
}

run();
